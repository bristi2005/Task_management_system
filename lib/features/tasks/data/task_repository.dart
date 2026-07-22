import 'package:dio/dio.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../core/network/dio_client.dart';
import '../domain/task.dart';

part 'task_repository.g.dart';

class TaskRepository {
  final Dio client;

  TaskRepository({required this.client});

  Future<List<Task>> getTasks({TaskStatus? status, TaskPriority? priority, String? search}) async {
    final response = await client.get('/tasks', queryParameters: {
      if (status != null) 'status': status.name,
      if (priority != null) 'priority': priority.name,
      if (search != null) 'search': search,
    });
    return (response.data as List).map((e) => Task.fromJson(e)).toList();
  }

  Future<Task> getTask(String id) async {
    final response = await client.get('/tasks/$id');
    return Task.fromJson(response.data);
  }

  Future<Task> createTask(Map<String, dynamic> data) async {
    final response = await client.post('/tasks', data: data);
    return Task.fromJson(response.data);
  }

  Future<Task> updateTask(String id, Map<String, dynamic> data) async {
    final response = await client.put('/tasks/$id', data: data);
    return Task.fromJson(response.data);
  }

  Future<void> deleteTask(String id) async {
    await client.delete('/tasks/$id');
  }

  Future<TaskSummary> getSummary() async {
    final response = await client.get('/tasks/summary');
    return TaskSummary.fromJson(response.data);
  }
}

@riverpod
TaskRepository taskRepository(TaskRepositoryRef ref) {
  return TaskRepository(client: ref.watch(dioProvider));
}
