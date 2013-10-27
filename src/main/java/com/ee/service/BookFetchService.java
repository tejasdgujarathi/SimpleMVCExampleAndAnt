package com.ee.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import com.ee.model.Book;

public class BookFetchService {

	public Book fetchDetails(String bookName) throws Exception {
		
			String url = "jdbc:mysql://localhost/test";
			Class.forName("com.mysql.jdbc.Driver").newInstance();

			Connection mysqlConn = DriverManager.getConnection(url, "root",
					"caplind3m0");
			Statement psmt = mysqlConn.createStatement();
			ResultSet rs = psmt.executeQuery("select * from test.books_ant where bookName='"+ bookName +"' ;");
			rs.next();

			Book book = new Book(rs.getString(1), rs.getString(2), rs.getString(3));
			mysqlConn.close();
			return book;			
	}

}
