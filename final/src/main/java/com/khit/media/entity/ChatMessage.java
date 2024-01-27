package com.khit.media.entity;

import lombok.Data;

@Data
public class ChatMessage {
    private String content;
    private String sender;
}