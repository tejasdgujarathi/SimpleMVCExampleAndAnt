package com.ee.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ee.model.Book;
import com.ee.service.BookFetchService;

@SuppressWarnings("serial")
public class BookDetailsFetcher extends HttpServlet {
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// writer.println("Bookstore");
		// response.setContentType("text/html");
		String bookName = request.getParameter("bookName").trim();
		try {
			try {
				Book bookReceived = new BookFetchService()
						.fetchDetails(bookName);

				if (bookReceived == null) {

				} else {
					request.setAttribute("bookReceived", bookReceived);
					RequestDispatcher detailsPageDispatcher = request
							.getRequestDispatcher("details.jsp");

					detailsPageDispatcher.forward(request, response);
				}
			} catch (java.sql.SQLException exception) {
				request.setAttribute("invalidBookName", "Invalid Book Name. \nPlease traverse back and re-enter.");
				RequestDispatcher detailsPageDispatcher = request
						.getRequestDispatcher("error.jsp");
				detailsPageDispatcher.forward(request, response);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
