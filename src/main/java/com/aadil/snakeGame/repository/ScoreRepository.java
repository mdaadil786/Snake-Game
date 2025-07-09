package com.aadil.snakeGame.repository;

import com.aadil.snakeGame.model.Score;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ScoreRepository extends MongoRepository<Score, String> {
    List<Score> findTop10ByOrderByScoreDesc();
}
