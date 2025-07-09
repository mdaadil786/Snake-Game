package com.aadil.snakeGame.controller;

import com.aadil.snakeGame.model.Score;
import com.aadil.snakeGame.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin("*")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @PostMapping
    public String saveScore(@RequestBody Score score) {
        scoreService.saveScore(score);
        return "Score Saved!";
    }

    @GetMapping("/leaderboard")
    public List<Score> getLeaderboard() {
        return scoreService.getTopScores();
    }
}
