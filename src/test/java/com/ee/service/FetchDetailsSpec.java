package com.ee.service;

import junit.framework.Assert;
import com.ee.service.BookFetchService;
import org.junit.Test;

import com.ee.model.Book;

public class FetchDetailsSpec {
	@Test
	public void itChecksIfBookDetailsAreFetched() throws Exception {
		// Given
		String bookName = "Chh";
		String author = "Yash";
		String id = "C123";

		// When

		Book bookReceived = new BookFetchService().fetchDetails(bookName);
		String bookAuthor = bookReceived.getBookAuthor();
		String bookId = bookReceived.getBookId();

		// Then
		Assert.assertEquals(author, bookAuthor);
		Assert.assertEquals(id, bookId);

	}
}
