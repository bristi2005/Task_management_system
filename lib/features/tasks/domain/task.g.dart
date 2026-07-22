// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$TaskImpl _$$TaskImplFromJson(Map<String, dynamic> json) => _$TaskImpl(
  id: json['id'] as String,
  title: json['title'] as String,
  description: json['description'] as String?,
  priority: $enumDecode(_$TaskPriorityEnumMap, json['priority']),
  status: $enumDecode(_$TaskStatusEnumMap, json['status']),
  dueDate: DateTime.parse(json['dueDate'] as String),
  userId: json['userId'] as String,
  createdAt: DateTime.parse(json['createdAt'] as String),
  updatedAt: DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$$TaskImplToJson(_$TaskImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'description': instance.description,
      'priority': _$TaskPriorityEnumMap[instance.priority]!,
      'status': _$TaskStatusEnumMap[instance.status]!,
      'dueDate': instance.dueDate.toIso8601String(),
      'userId': instance.userId,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };

const _$TaskPriorityEnumMap = {
  TaskPriority.LOW: 'LOW',
  TaskPriority.MEDIUM: 'MEDIUM',
  TaskPriority.HIGH: 'HIGH',
  TaskPriority.URGENT: 'URGENT',
};

const _$TaskStatusEnumMap = {
  TaskStatus.PENDING: 'PENDING',
  TaskStatus.IN_PROGRESS: 'IN_PROGRESS',
  TaskStatus.COMPLETED: 'COMPLETED',
};

_$TaskSummaryImpl _$$TaskSummaryImplFromJson(Map<String, dynamic> json) =>
    _$TaskSummaryImpl(
      total: (json['total'] as num).toInt(),
      completed: (json['completed'] as num).toInt(),
      pending: (json['pending'] as num).toInt(),
      inProgress: (json['inProgress'] as num).toInt(),
      overdue: (json['overdue'] as num).toInt(),
    );

Map<String, dynamic> _$$TaskSummaryImplToJson(_$TaskSummaryImpl instance) =>
    <String, dynamic>{
      'total': instance.total,
      'completed': instance.completed,
      'pending': instance.pending,
      'inProgress': instance.inProgress,
      'overdue': instance.overdue,
    };
