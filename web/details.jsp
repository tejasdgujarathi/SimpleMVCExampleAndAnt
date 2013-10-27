<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="com.ee.model.Book" %>
<html>
<head>
<title>Book Details</title>
<link rel="stylesheet" type="text/css" href="welcome_page.css" />
</head>
<body>
Details Of your book are : 

<% Book book = (Book)request.getAttribute("bookReceived");
	if(book!=null){
	out.print("<br><br> <table align=left border=3 cellpadding=10 cellspacing=3 ><tr valign=center><th>Book-ID</th><th>Book-Name</th><th>Book-Author</th></tr>");
	out.print("<tr valign=center>");
 	out.print("<td>"+book.getBookId() +"</td>");
 	out.print("<td>"+book.getBookName()+"</td>");
 	out.print("<td>"+book.getBookAuthor()+"</td>");
 	out.print("</tr>");
	out.print("</table>");
	}
	else
	out.print("No Books.");
%>
</body>
</html>