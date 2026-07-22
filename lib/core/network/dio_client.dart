import 'package:dio/dio.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../storage/secure_storage.dart';

part 'dio_client.g.dart';

@riverpod
Dio dio(DioRef ref) {
  final dio = Dio(
    BaseOptions(
      // 10.0.2.2 is the special alias to your host loopback interface (localhost on your development machine)
      baseUrl: 'http://10.0.2.2:3000/api',
      connectTimeout: const Duration(seconds: 5),
      receiveTimeout: const Duration(seconds: 3),
    ),
  );

  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) async {
        final storage = ref.read(secureStorageProvider);
        final token = await storage.getToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (DioException e, handler) {
        if (e.response?.statusCode == 401) {
          // Handle automatic logout
          ref.read(secureStorageProvider).deleteToken();
          // Ideally trigger a router redirect here if possible, 
          // but usually the next navigation or a provider state change will handle it.
        }
        return handler.next(e);
      },
    ),
  );

  return dio;
}
