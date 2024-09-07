import { subscribe } from 'diagnostics_channel';
import { Observable } from 'rxjs';

export const rxjsSample1 = () => {
    const myOb1 = new Observable((subscriber) => {
        subscriber.next('val1')
        subscriber.next('val2')
        subscriber.next('val3')
        subscriber.complete()
    })

    const operations = []
    operations.push('begin')
    myOb1.subscribe({
        // executed synchronously, see test
        next: (x) => operations.push(x),
        error: (err) => operations.push(err.toString()),
        complete: () => operations.push('done')
    })
    operations.push('end')
    return operations
}