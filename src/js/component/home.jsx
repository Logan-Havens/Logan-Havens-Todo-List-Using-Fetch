import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
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
					{item} <i class="fa fa-trash" aria-hidden="true" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i>
					</li>
				))}
			</ul>
				<div> {todos.length} Tasks 
					</div>
		</div>
	);
};

export default Home;

