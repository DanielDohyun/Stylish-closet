import React from 'react';
import useFirestore from '../../hooks/useFirestore';

const ImageGrid = () => {
  const {docs} = useFirestore('closet');
  console.log(docs);

  return (
    <div className="img-grid">
      images
    </div>
  )
}

export default ImageGrid;