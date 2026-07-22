// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task_controller.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$taskSummaryHash() => r'886ca75a81682052b73f57bda275a6cf5063d902';

/// See also [taskSummary].
@ProviderFor(taskSummary)
final taskSummaryProvider = AutoDisposeFutureProvider<TaskSummary>.internal(
  taskSummary,
  name: r'taskSummaryProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$taskSummaryHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef TaskSummaryRef = AutoDisposeFutureProviderRef<TaskSummary>;
String _$taskListControllerHash() =>
    r'98fb9dc56df8763742c454c546e12f6eac95e015';

/// Copied from Dart SDK
class _SystemHash {
  _SystemHash._();

  static int combine(int hash, int value) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + value);
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
    return hash ^ (hash >> 6);
  }

  static int finish(int hash) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
    // ignore: parameter_assignments
    hash = hash ^ (hash >> 11);
    return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
  }
}

abstract class _$TaskListController
    extends BuildlessAutoDisposeAsyncNotifier<List<Task>> {
  late final TaskStatus? status;
  late final TaskPriority? priority;
  late final String? search;

  FutureOr<List<Task>> build({
    TaskStatus? status,
    TaskPriority? priority,
    String? search,
  });
}

/// See also [TaskListController].
@ProviderFor(TaskListController)
const taskListControllerProvider = TaskListControllerFamily();

/// See also [TaskListController].
class TaskListControllerFamily extends Family<AsyncValue<List<Task>>> {
  /// See also [TaskListController].
  const TaskListControllerFamily();

  /// See also [TaskListController].
  TaskListControllerProvider call({
    TaskStatus? status,
    TaskPriority? priority,
    String? search,
  }) {
    return TaskListControllerProvider(
      status: status,
      priority: priority,
      search: search,
    );
  }

  @override
  TaskListControllerProvider getProviderOverride(
    covariant TaskListControllerProvider provider,
  ) {
    return call(
      status: provider.status,
      priority: provider.priority,
      search: provider.search,
    );
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'taskListControllerProvider';
}

/// See also [TaskListController].
class TaskListControllerProvider
    extends
        AutoDisposeAsyncNotifierProviderImpl<TaskListController, List<Task>> {
  /// See also [TaskListController].
  TaskListControllerProvider({
    TaskStatus? status,
    TaskPriority? priority,
    String? search,
  }) : this._internal(
         () => TaskListController()
           ..status = status
           ..priority = priority
           ..search = search,
         from: taskListControllerProvider,
         name: r'taskListControllerProvider',
         debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
             ? null
             : _$taskListControllerHash,
         dependencies: TaskListControllerFamily._dependencies,
         allTransitiveDependencies:
             TaskListControllerFamily._allTransitiveDependencies,
         status: status,
         priority: priority,
         search: search,
       );

  TaskListControllerProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.status,
    required this.priority,
    required this.search,
  }) : super.internal();

  final TaskStatus? status;
  final TaskPriority? priority;
  final String? search;

  @override
  FutureOr<List<Task>> runNotifierBuild(covariant TaskListController notifier) {
    return notifier.build(status: status, priority: priority, search: search);
  }

  @override
  Override overrideWith(TaskListController Function() create) {
    return ProviderOverride(
      origin: this,
      override: TaskListControllerProvider._internal(
        () => create()
          ..status = status
          ..priority = priority
          ..search = search,
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        status: status,
        priority: priority,
        search: search,
      ),
    );
  }

  @override
  AutoDisposeAsyncNotifierProviderElement<TaskListController, List<Task>>
  createElement() {
    return _TaskListControllerProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is TaskListControllerProvider &&
        other.status == status &&
        other.priority == priority &&
        other.search == search;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, status.hashCode);
    hash = _SystemHash.combine(hash, priority.hashCode);
    hash = _SystemHash.combine(hash, search.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin TaskListControllerRef on AutoDisposeAsyncNotifierProviderRef<List<Task>> {
  /// The parameter `status` of this provider.
  TaskStatus? get status;

  /// The parameter `priority` of this provider.
  TaskPriority? get priority;

  /// The parameter `search` of this provider.
  String? get search;
}

class _TaskListControllerProviderElement
    extends
        AutoDisposeAsyncNotifierProviderElement<TaskListController, List<Task>>
    with TaskListControllerRef {
  _TaskListControllerProviderElement(super.provider);

  @override
  TaskStatus? get status => (origin as TaskListControllerProvider).status;
  @override
  TaskPriority? get priority => (origin as TaskListControllerProvider).priority;
  @override
  String? get search => (origin as TaskListControllerProvider).search;
}

// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
