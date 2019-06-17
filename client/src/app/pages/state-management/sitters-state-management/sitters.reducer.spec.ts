import { sittersReducer } from "./sitters.reducer";
import { SitterState } from "src/app/store";
var deepFreeze = require("deep-freeze");
import * as types from "./sitter.actions";
import { TestDataService } from "src/app/services/sitter-data.service";

describe("sitters reducer", () => {
  it("should return the sitters initial state", () => {
    expect(sittersReducer(undefined, {})).toEqual({
      sitters: [],
      isLoading: false
    });
  });

  // Test to check if the add new baby sitter works correctly
  it("should add a new babysitter", () => {
    let stateBefore = { sitters: [] } as SitterState;
    deepFreeze(stateBefore); //deepFreeze tests the immutability of the reducer
    //This library will perform a recursive Object.freeze() on the entire state object protecting it from mutation. 
    const sitter = {
      id: "2131",
      data: {
        age: 18,
        availability: "Mondays and Thursdays",
        description: "My name is Lucy",
        images: [
          "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png"
        ],
        location: "Ballerup",
        maximumPrice: 140,
        minimumPrice: 150,
        name: "Lucy",
        quote: " I whip out my origami skills",
        recentOnlineDate: new Date(2019, 3, 18),
        reviews: 20,
        verified: 1,
        strengths: ["reading and cooking"]
      }
    };

    let stateAfter = { sitters: [sitter] };

    let response = sittersReducer(stateBefore, {
      type: types.SitterActions.CREATE_SITTER_SUCCESS,
      payload: sitter
    });
    expect(stateAfter).toEqual(response);
  });

  it("should delete a babysitter from the sitters array based on the id of the sitter", () => {

    let beforeState = {
      sitters: TestDataService.sitters,
      isLoading: false
    };
    deepFreeze(beforeState);
    let afterState = {
      sitters: [
        {
          id: "2",
          data: {
            age: 18,
            availability: "Mondays and Thursdays",
            description: "My name is Lucy",
            images: [
              "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png"
            ],
            location: "Ballerup",
            maximumPrice: 140,
            minimumPrice: 150,
            name: "Lucy",
            quote: " I whip out my origami skills",
            recentOnlineDate: new Date(2019, 3, 18),
            reviews: 20,
            verified: 1,
            strengths: ["reading and cooking"]
          }
        }
      ],
      isLoading: false
    };
    let response = sittersReducer(beforeState, {
      type: types.SitterActions.DELETE_SITTER,
      payload: "1"
    });

    expect(afterState).toEqual(response);
  });

  it('should update the "verified" field in the sitters object', () => {
    let beforeState = {
      sitters: [
        {
          id: "1",
          data: {
            age: 18,
            availability: "Mondays and Thursdays",
            description: "My name is Lucy",
            images: [
              "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png"
            ],
            location: "Ballerup",
            maximumPrice: 140,
            minimumPrice: 150,
            name: "Lucy",
            quote: " I whip out my origami skills",
            recentOnlineDate: new Date(2019, 3, 18),
            reviews: 20,
            verified: 1,
            strengths: ["reading and cooking"]
          }
        },
        {
          id: "2",
          data: {
            age: 18,
            availability: "Mondays and Thursdays",
            description: "My name is Lucy",
            images: [
              "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png"
            ],
            location: "Ballerup",
            maximumPrice: 140,
            minimumPrice: 150,
            name: "Lucy",
            quote: " I whip out my origami skills",
            recentOnlineDate: new Date(2019, 3, 18),
            reviews: 20,
            verified: 1,
            strengths: ["reading and cooking"]
          }
        }
      ],
      isLoading: false
    } as SitterState;
    deepFreeze(beforeState);

    let afterState = {
      sitters: [
        {
          id: "1",
          data: {
            age: 18,
            availability: "Mondays and Thursdays",
            description: "My name is Lucy",
            images: [
              "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png"
            ],
            location: "Ballerup",
            maximumPrice: 140,
            minimumPrice: 150,
            name: "Lucy",
            quote: " I whip out my origami skills",
            recentOnlineDate: new Date(2019, 3, 18),
            reviews: 20,
            verified: 1,
            strengths: ["reading and cooking"]
          }
        },
        {
          id: "2",
          data: {
            age: 18,
            availability: "Mondays and Thursdays",
            description: "My name is Lucy",
            images: [
              "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png"
            ],
            location: "Ballerup",
            maximumPrice: 140,
            minimumPrice: 150,
            name: "Lucy",
            quote: " I whip out my origami skills",
            recentOnlineDate: new Date(2019, 3, 18),
            reviews: 20,
            verified: 0,
            strengths: ["reading and cooking"]
          }
        }
      ],
      isLoading: false
    } as SitterState;

    let response = sittersReducer(beforeState, {
      type: types.SitterActions.UPDATE_SITTER_SUCCESS,
      payload: {
        id: "2",
        data: {
          age: 18,
          availability: "Mondays and Thursdays",
          description: "My name is Lucy",
          images: [
            "https://assets.capitalfm.com/2018/23/lilliya-scarlett-instagram-1528814125-custom-0.png"
          ],
          location: "Ballerup",
          maximumPrice: 140,
          minimumPrice: 150,
          name: "Lucy",
          quote: " I whip out my origami skills",
          recentOnlineDate: new Date(2019, 3, 18),
          reviews: 20,
          verified: 0,
          strengths: ["reading and cooking"]
        }
      }
    });

    expect(afterState).toEqual(response);
  });
});
