import 'package:freezed_annotation/freezed_annotation.dart';

part 'task.freezed.dart';
part 'task.g.dart';

enum TaskPriority { LOW, MEDIUM, HIGH, URGENT }
enum TaskStatus { PENDING, IN_PROGRESS, COMPLETED }

@freezed
class Task with _$Task {
  const factory Task({
    required String id,
    required String title,
    String? description,
    required TaskPriority priority,
    required TaskStatus status,
    required DateTime dueDate,
    required String userId,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) = _Task;

  factory Task.fromJson(Map<String, dynamic> json) => _$TaskFromJson(json);
}

@freezed
class TaskSummary with _$TaskSummary {
  const factory TaskSummary({
    required int total,
    required int completed,
    required int pending,
    required int inProgress,
    required int overdue,
  }) = _TaskSummary;

  factory TaskSummary.fromJson(Map<String, dynamic> json) => _$TaskSummaryFromJson(json);
}
