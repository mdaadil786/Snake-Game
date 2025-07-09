package com.aadil.snakeGame;

import javax.swing.*;
import java.awt.*;

public class SnakeGame {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Snake Game");
        GamePanel gamePanel = new GamePanel();

        JButton startButton = new JButton("Start");
        JButton pauseButton = new JButton("Pause");
        JButton restartButton = new JButton("Restart");

        JPanel controlPanel = new JPanel();
        controlPanel.setBackground(Color.DARK_GRAY);
        controlPanel.add(startButton);
        controlPanel.add(pauseButton);
        controlPanel.add(restartButton);

        frame.setLayout(new BorderLayout());
        frame.add(gamePanel, BorderLayout.CENTER);
        frame.add(controlPanel, BorderLayout.SOUTH);

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setResizable(false);
        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);

        startButton.addActionListener(e -> gamePanel.startGame());
        pauseButton.addActionListener(e -> gamePanel.pauseGame());
        restartButton.addActionListener(e -> gamePanel.restartGame());
    }
}
