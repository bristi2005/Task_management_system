import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../features/authentication/presentation/login_screen.dart';
import '../../features/dashboard/presentation/dashboard_screen.dart';
import '../../features/tasks/presentation/task_list_screen.dart';
import '../../features/tasks/presentation/task_form_screen.dart';
import '../storage/secure_storage.dart';

part 'app_router.g.dart';

@riverpod
GoRouter appRouter(AppRouterRef ref) {
  return GoRouter(
    initialLocation: '/dashboard',
    redirect: (context, state) async {
      final storage = ref.read(secureStorageProvider);
      final token = await storage.getToken();
      
      final isLoggingIn = state.matchedLocation == '/login';
      
      if (token == null) {
        return isLoggingIn ? null : '/login';
      }
      
      if (isLoggingIn) {
        return '/dashboard';
      }
      
      return null;
    },
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardScreen(),
      ),
      GoRoute(
        path: '/tasks',
        builder: (context, state) => const TaskListScreen(),
        routes: [
          GoRoute(
            path: 'create',
            builder: (context, state) => const TaskFormScreen(),
          ),
          GoRoute(
            path: 'edit/:id',
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return TaskFormScreen(taskId: id);
            },
          ),
        ],
      ),
    ],
  );
}
