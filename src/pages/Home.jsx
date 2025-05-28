import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
  const [charName, setCharname] = useState('');
  const [charImage, setCharimage] = useState('');
  const [gender, setGender] = useState('');
  const [allCharacters, setAllCharacters] = useState([]);
  const [search, setSearch] = useState('');

  const apiUrl = "https://68219a91259dad2655afc3cc.mockapi.io/api/users/user";

  useEffect(() => {
    axios.get(apiUrl)
      .then((res) => {
        setAllCharacters(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const uploadInfo = () => {
    axios.post(apiUrl, {
      charName,
      charImage,
      gender
    })
      .then((res) => {
        alert("Success");
        const updatedList = [...allCharacters, res.data];
        setAllCharacters(updatedList);
        setCharname('');
        setCharimage('');
        setGender('');
      })
      .catch((err) => {
        console.error(err);
        alert("There is an error");
      });
  };

  return (
    <div className='bg-[#f7e1d7] min-h-screen p-4'>
      <div className='flex justify-between bg-[#fec5bb] p-5 rounded mb-4'>
        <h1 className='font-bold text-[1rem]'>Disney Character</h1>
        <div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="Search..."
            value={search}
          />
        </div>
      </div>

{/* upload info */}
      <div className='flex flex-col max-w-md mx-auto mb-8'>
        <input
          type="text"
          className='border rounded p-2 mb-2'
          value={charName}
          onChange={(e) => setCharname(e.target.value)}
          placeholder="Enter character name"
        />
        <input
          type="text"
          className='border rounded p-2 mb-2'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Enter character gender"
        />
        <input
          type="text"
          className='border rounded p-2 mb-2'
          value={charImage}
          onChange={(e) => setCharimage(e.target.value)}
          placeholder="Upload character image URL"
        />
        <button
          className='border rounded bg-pink-700 text-white px-3 py-2'
          onClick={uploadInfo}
        >
          Upload character!
        </button>
      </div>

      {/* Show characters */}
      <h2 className="text-center font-bold text-[1.2rem] mb-4">Characters:</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {allCharacters
          .filter((char) =>
            char.charName.toLowerCase().includes(search.toLowerCase())
          )
          .map((char) => (
            <div key={char.id} className="text-center p-4">
              <img
                className="rounded-full w-40 h-40 object-cover mx-auto border-2 border-pink-800"
                src={char.charimage}
                alt={char.charName}
              />
              <h3 className="font-semibold mt-2">{char.charName}</h3>
              <h2 className="text-gray-500">{char.gender}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
