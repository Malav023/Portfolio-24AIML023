import {useState, useEffect} from 'react'; 

export default function FetchRepositories(){
	const [repo_list, setRepoList]=useState([]);
	const [error, setError]=useState(null); 
	const [status, setStatus]=useState('fetching');  

	useEffect(() => {
		const fetchResponse=async()=> {

		const reponse=await fetch("https://api.github.com/users/Malav023/repos?sort=updated");

		try{
			if(!reponse.ok)
			{
				throw new Error('Failed to fetch user Repositories!!'); 
			}

			const data=await reponse.json();
			setRepoList(data); 
			setStatus('success');
		}
		catch(err){
			setError(err.message); 
			setStatus('error'); 
		}
	};
	fetchResponse(); 
}, []);


	return (
		<>
			<h1>Github Repositories</h1>
			//display fetched list of repositories :

			{status === 'fetching' && <p>Loading repositories...</p>}

	        {status === 'error' && <p>Error: {error}</p>}

	        {status === 'success' && (
	        	<ul>
	                    {repo_list.map((repo) => (
	                        <li key={repo.id}>
	                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
	                                {repo.name}
	                            </a>
	                            {repo.description && <p>{repo.description}</p>}
	                        </li>
	                    ))}
	            </ul>
	        )}

        </>

	);
}