import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const untilDestroyed = (
  componentInstance: any,
  destroyMethodName = 'componentWillUnmount'
) => <T>(source: Observable<T>) => {
  const originalDestroy = componentInstance[destroyMethodName];

  if (!componentInstance['__takeUntilDestroy']) {
    componentInstance['__takeUntilDestroy'] = new Subject();

    componentInstance[destroyMethodName] = function() {
      typeof originalDestroy === 'function' &&
        originalDestroy.apply(this, arguments);
      componentInstance['__takeUntilDestroy'].next(true);
      componentInstance['__takeUntilDestroy'].complete();
    };
  }

  return source.pipe(takeUntil<T>(componentInstance['__takeUntilDestroy']));
};
