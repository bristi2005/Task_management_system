import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../data/task_repository.dart';
import '../domain/task.dart';

part 'task_controller.g.dart';

@riverpod
class TaskListController extends _$TaskListController {
  @override
  FutureOr<List<Task>> build({TaskStatus? status, TaskPriority? priority, String? search}) async {
    return ref.watch(taskRepositoryProvider).getTasks(
      status: status,
      priority: priority,
      search: search,
    );
  }

  Future<void> toggleComplete(Task task) async {
    final newStatus = task.status == TaskStatus.COMPLETED ? TaskStatus.PENDING : TaskStatus.COMPLETED;
    await ref.read(taskRepositoryProvider).updateTask(task.id, {'status': newStatus.name});
    ref.invalidateSelf();
  }

  Future<void> deleteTask(String id) async {
    await ref.read(taskRepositoryProvider).deleteTask(id);
    ref.invalidateSelf();
  }
}

@riverpod
Future<TaskSummary> taskSummary(TaskSummaryRef ref) {
  return ref.watch(taskRepositoryProvider).getSummary();
}
