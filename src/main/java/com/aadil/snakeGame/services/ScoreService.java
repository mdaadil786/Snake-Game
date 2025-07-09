package com.aadil.snakeGame.services;

import com.aadil.snakeGame.model.Score;
import com.aadil.snakeGame.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository repository;

    public void saveScore(Score score) {
        repository.save(score);
    }

    public List<Score> getTopScores() {
        return repository.findTop10ByOrderByScoreDesc();
    }
}
