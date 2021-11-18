
mutation addBooks($data: [AddBookInput!]!) {
    addBook(input: $data) {
      numUids
      book {
        id
        name
      }
    }
  }

{
    "data": [
        {
            "name": "Lean In",
            "bookAuthor": {
                "name": "Sheryl Sandberg"
            }
        },
        {
            "name": "Mossad",
            "bookAuthor": {
                "name": "Michael Bar-Zohar"
            }
        },
        {
            "name": "Ikigai",
            "bookAuthor": {
                "name": "Hector Garcia Puigcerver"
            }
        }
    ]
}