// StudyDashboard.jsx
import './StudyDashboard.css';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const StudyDashboard = () => {
    const [showLectureList, setShowLectureList] = useState(false);

    const handleFindLecture = () => {
        setShowLectureList(!showLectureList);
    };

    return (
        <div className='StudyDashboard'>
            여기에 자유ㅜ롭게
        </div>
    );
};

export default StudyDashboard;
