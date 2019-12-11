import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

function LoaderComponent() {
  return (
    <Segment>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
  );
}

export default LoaderComponent;
