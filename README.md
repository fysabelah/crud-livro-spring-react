# A CRUD application of Books
The application uses:
  * Java,
  * Hibernate,
  * Spring Boot,
  * PostgreSQL, e
  * React.

Two entities were considered, book and author. The attributes, or columns, can be seen in crud-livro package called entities. For database development, it was considered that an author could have many books. Therefore, 1 x N. 
   
I tried to make use of the mvc architecture, where the view would be on the front end, but I believe I made a mistake in the construction. The back end was separated into control and model.
