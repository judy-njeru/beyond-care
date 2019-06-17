import { Injectable } from "@angular/core";
import { Sitter } from "../entities/sitter";

@Injectable({
  providedIn: "root"
})
export class TestDataService {
  static sitters: Sitter[] = [
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
  ];

  constructor() {}
}
