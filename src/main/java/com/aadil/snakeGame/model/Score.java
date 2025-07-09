package com.aadil.snakeGame.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Score {
    @Id
    private String id;

    private String username;
    private int score;
}
