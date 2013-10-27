package com.ee.model;

public class Book {
	private String bookId;
	private String bookName;
	private String bookAuthor;

	public Book(String id, String name, String author) {
		bookId = id;
		bookName = name;
		bookAuthor = author;
	}

	public String getBookAuthor() {
		return bookAuthor;
	}
	
	public String getBookName() {
		return bookName;
	}

	public String getBookId() {
		return bookId;
	}

}
