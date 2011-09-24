HtmlCompressor v.1.5.2
http://code.google.com/p/htmlcompressor/
	
Small, fast and very easy to use Java library that minifies given HTML or XML source by removing extra whitespaces, comments and other unneeded characters without breaking the content structure. As a result pages become smaller in size and load faster. A command-line version of the compressor is also available. 


PACKAGE CONTENT:
	/bin - contains main htmlcompressor-1.5.2.jar binary, 
			as well as several extra jars (could be useful for IDE integration)
	/doc - javadocs
	/src - sources
	/lib - dependencies (for using with a command line compressor or non-Maven projects)
	pom.xml - Maven POM file
	build.bat - Maven build launcher for Win
	build.sh - Maven build launcher for *nix
	

USAGE:
	For java projects add htmlcompressor-1.5.2.jar library to your project's classpath
	For a command line usage run:
		java -jar htmlcompressor-1.5.2.jar -h
	to get a brief description of available parameters.
	
	Please refer to http://code.google.com/p/htmlcompressor/ for the detailed documentation.
	

PROJECT BUILD:
	- Install JDK v.5+ (http://www.oracle.com/technetwork/java/javase/downloads/index.html)
	- Install Maven v.2+ (http://maven.apache.org/download.html)
	- Run build.bat or build.sh
	- Compiled binaries will be placed in /target subdirectory


CHANGELOG:
	http://code.google.com/p/htmlcompressor/wiki/Changelog
