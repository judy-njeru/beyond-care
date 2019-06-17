import { Pipe, PipeTransform } from "@angular/core";
import { Sitter } from "./entities/sitter";

@Pipe({//decorator to create pipes
  name: "sitterFilter"//name of the pipe. will be used in the sitters html component
})
export class SitterPipe implements PipeTransform { //create SitterPipe class which implements the PipeTransform.
  transform(sitters: Sitter[], search: any = ""): any { 
    //transform method takes sitter array and the search value as arguments and returns the result
    //sitters is the object that's passed into the pipe i.e goes before  the | expression
    //search parameter is the value that goes after the : in the expression
    let result = sitters.filter(
      sitter =>
        sitter.data &&
        sitter.data.location.toLowerCase().includes(search.toLowerCase())
    );

    if (result.length === 0) {
      return [-1];
    }
    return result;
  }
}
