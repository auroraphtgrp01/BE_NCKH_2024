import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, catchError, throwError } from 'rxjs'

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(() => error)
        } else {
          console.log(error)

          return throwError(() => new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR))
        }
      })
    )
  }
}
