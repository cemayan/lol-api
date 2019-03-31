export interface IError {
  status: IErrorMessage,
}


export interface IErrorMessage {
  message: String,
  status_code: String
}