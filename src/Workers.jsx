import { useState }from 'react'

function Workers() {
    // const [workersData, setWorkerData] = useState({name: "Aziz", salary: 3000})
    
    const [workersData, setworkersData] = useState(
        {
            name: "ali",
            salary: 2000,
            posting: {
            region: "kpk",
            location: "peshawer"
        }})
        const changeRegion = () => {
        setworkersData({...workersData, posting:{...workersData.posting, location: "Abbottabad"}})
    }
        const handleChange = (e) => {
            
        }
  return (
    <>
        <input type="text" onChange={handleChange} />
        <p>{workersData.salary}</p>
        <button onClick={changeRegion}>Increase Salary</button>

        <p>{workersData.posting.location}</p>
    </>
  )
}

export default Workers