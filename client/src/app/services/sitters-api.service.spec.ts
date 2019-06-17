import { TestBed } from "@angular/core/testing";

import { SittersApiService } from "./sitters-api.service";
import { HttpClientModule } from "@angular/common/http";

describe("SittersApiService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it("should be created", () => {
    const service: SittersApiService = TestBed.get(SittersApiService);
    expect(service).toBeTruthy();
  });
});
