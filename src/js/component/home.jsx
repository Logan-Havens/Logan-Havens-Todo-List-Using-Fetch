import React, {useState, useEffect} from "react";


const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	function fetchTodo (){
		fetch('https://playground.4geeks.com/apis/fake/todos/user/loganhavens', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // The status code=200 or code=400 etc.
        return resp.json(); 
		// (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
    })
    .then(data => {
        setTodos (data)
        console.log(data); // This will print on the console the exact object received from the server
    })
    .catch(error => {
        // Error handling
        console.log(error);
		console.log("hey")
    });
	};

	function postTodo (){
		fetch('https://playground.4geeks.com/apis/fake/todos/user/loganhavens', {
  method: 'POST', 
  body: JSON.stringify(todos), 
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => {
    if (!res.ok) throw Error(res.statusText);
    return res.json();
  })
  .then(response => console.log('Success:', response))
  .catch(error => console.error(error));
	}

  
	useEffect(()=>{
		fetchTodo()
	}, []) 

	useEffect (()=>{
		postTodo
	}, [])

	return (
		<div className="containter">
			<h1>To Do's</h1>
			<ul>
				<li>
					<input 
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							setTodos(todos.concat(inputValue));
							setInputValue("");
							}  
						}}
				 		placeholder="What do you need to do?"></input> 
				</li>
				{todos.map((item, index) =>(
					<li>
					{item.label} <i class="fa fa-trash" aria-hidden="true" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i>
					</li>
				))}
			</ul>
				<div> {todos.length} Tasks 
					</div>
		</div>
	);
};

export default Home;

