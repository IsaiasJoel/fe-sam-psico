import { Observable, ReplaySubject } from "rxjs";

export function convertirFileABase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => result.next(reader.result as string);
    return result;
}