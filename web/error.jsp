<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*" %>
<html>
<title>Error Page</title>
<head>
<link rel="stylesheet" type="text/css" href="welcome_page.css" />
</head>
<body>
<%
String errorMessage = (String)request.getAttribute("invalidBookName");
out.print("ERROR: "+errorMessage);
%>
</body>
</html>