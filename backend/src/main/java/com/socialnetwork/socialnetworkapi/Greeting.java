package com.socialnetwork.socialnetworkapi;

import lombok.Getter;

@Getter
public class Greeting {

	private String content;

	public Greeting() {
	}

	public Greeting(String content) {
		this.content = content;
	}

}
