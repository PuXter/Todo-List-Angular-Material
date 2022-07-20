import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postTodo(data: any){
    return this.http.post<any>("http://127.0.0.1:3000/todoList/", data);
  }
  getTodo(){
    return this.http.get<any>("http://127.0.0.1:3000/todoList/");
  }
  putTodo(data: any, id: number){
    return this.http.put<any>("http://127.0.0.1:3000/todoList/"+id, data);
  }
  deleteTodo(id: number){
    return this.http.delete<any>("http://127.0.0.1:3000/todoList/"+id);
  }
}
