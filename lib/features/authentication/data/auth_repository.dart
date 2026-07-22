import 'package:dio/dio.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../core/network/dio_client.dart';
import '../../../core/storage/secure_storage.dart';
import '../domain/user.dart';

part 'auth_repository.g.dart';

class AuthRepository {
  final Dio client;
  final SecureStorage storage;

  AuthRepository({required this.client, required this.storage});

  Future<User> login(String email, String password) async {
    final response = await client.post('/auth/login', data: {
      'email': email,
      'password': password,
    });

    final token = response.data['token'];
    await storage.saveToken(token);

    return User.fromJson(response.data['user']);
  }

  Future<void> logout() async {
    await storage.deleteToken();
  }

  Future<User?> getCurrentUser() async {
    try {
      final response = await client.get('/auth/me');
      return User.fromJson(response.data);
    } catch (e) {
      return null;
    }
  }
}

@riverpod
AuthRepository authRepository(AuthRepositoryRef ref) {
  return AuthRepository(
    client: ref.watch(dioProvider),
    storage: ref.watch(secureStorageProvider),
  );
}
