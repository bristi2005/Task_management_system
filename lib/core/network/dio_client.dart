import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../storage/secure_storage.dart';
import 'dart:io' show Platform;

part 'dio_client.g.dart';

@riverpod
Dio dio(DioRef ref) {
  // Use 127.0.0.1 for better compatibility in some local environments
  String baseUrl = 'http://127.0.0.1:3000/api';
  
  if (!kIsWeb && Platform.isAndroid) {
    baseUrl = 'http://10.0.2.2:3000/api';
  }

  final dio = Dio(
    BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
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
          ref.read(secureStorageProvider).deleteToken();
        }
        return handler.next(e);
      },
    ),
  );

  return dio;
}
