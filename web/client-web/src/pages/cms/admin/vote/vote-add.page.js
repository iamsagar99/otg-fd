import React, { useState } from 'react';
import { addVote } from '../../../../services/vote.service';
import { toast } from "react-toastify";

const VotingPage = () => {
  const [formData, setFormData] = useState({
    user: "",
    election_id: "",
    candidate_id: "",
    position: ""
  });
  const [voted, setVoted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVote = async () => {
    try {
        let response = await addVote(formData);
        if (response.status) {
            toast.success(response.msg);
        } else {
            toast.error(response.msg)
        }
    } catch (error) {
        console.log(error)
        toast.error("Error voting");
    }
    setVoted(true);
  };



  return (
    <div>
      <h1>Vote for your candidate For testing purpose only</h1>
      <label>User ID:</label>
      <input
        type="text"
        name="user"
        value={formData.user}
        onChange={handleChange}
        placeholder="Enter user ID"
      />
      <label>Election ID:</label>
      <input
        type="text"
        name="election_id"
        value={formData.election_id}
        onChange={handleChange}
        placeholder="Enter election ID"
      />
      <label>Candidate ID:</label>
      <input
        type="text"
        name="candidate_id"
        value={formData.candidate_id}
        onChange={handleChange}
        placeholder="Enter candidate ID"
      />
      <label>Position:</label>
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Enter position"
      />
      <button onClick={handleVote}>Vote</button>
      {voted && <p>Thank you for voting!</p>}
    </div>
  );
};

export default VotingPage;
