import { SitterPipe } from "./sitter.pipe";
import { SittersComponent } from "./pages/sitters/sitters.component";
import { TestDataService } from "./services/sitter-data.service";

describe("SittersPipe", () => {

  it("create an instance", () => {
    const pipe = new SitterPipe();
    expect(pipe).toBeTruthy();
  });

  it("should return all sitters when search is empty", () => {
    const sitters = TestDataService.sitters;
    const pipe = new SitterPipe();// the pipe variable holds a new instance of the SitterPipe

    let result = pipe.transform(sitters, "");
    //checks to see that if the pipe doesn’t recieve an input it returns the default value i.e sitters
    expect(result).toEqual(sitters);
  });

  it("should return empty result when search location is not found", () => {
    const sitters = SittersComponent.allSitters;
    const pipe = new SitterPipe();

    let result = pipe.transform(sitters, "ll");

    expect(result).toEqual([-1]);
  });
});
