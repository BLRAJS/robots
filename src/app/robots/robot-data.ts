import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Robot } from './Robot';

export class RobotData implements InMemoryDbService {

  createDb() {
    const Robots: Robot[] = [
      {
        'id': 1,
        'approvalRating': 0.97,
        'description': 'The MPK2F is high-speed, 5-axis picking robot that provides superior performance and reliability for food handling, picking, packing and other high-speed material handling applications.',
        'manufact': 'MPK2/MPK2F is wash-down ready',
        'imageurl': 'http://www.roboticautomation.com.au/system/images/W1siZiIsIjIwMTUvMDMvMTIvOTF3azE2NmJ4ZV9NUEsyLmpwZyJdLFsicCIsInRodW1iIiwiMzAweDE4MFx1MDAzZSJdXQ/MPK2.jpg?sha=456516354ab2e749',
        'mpaa': 'pg-13',
        'price': 512.95,
        'releaseDate': '2001-12-19T00:00:00',
        'starRating': 4.88,
        'title': 'MPK2F',
        'category': 'Food handling',
        'tags': ['picking','walking', 'flight','slow']
      }
      ,
      {
        'id': 2,
        'manufact': 'Superseded by the MH3F',
        'description': 'The smallest model of the MH-series, the MOTOMAN MHJF, is a powerful high speed 6-axis robot, designed for more compact, lighter payload applications.',
        'imageurl': 'http://www.roboticautomation.com.au/system/images/W1siZiIsIjIwMTUvMDYvMDIvOG00Y3d6OGh0dF9NSEouanBnIl0sWyJwIiwidGh1bWIiLCIxMjV4MTI1IyJdXQ/MHJ.jpg?sha=b3b4e1e29914e621',
        'mpaa': 'pg-13',
        'releaseDate': '2002-12-18T00:00:00',
        'title': 'Motoman MHJF',
        'price': 514.95,
        'starRating': 4.2,
        'approvalRating': 0.94,
        'category': 'Payload applications',
        'tags': ['walking', 'fast']
      },
      {
        'id': 3,
        'manufact': ' ABC ROBOT',
        'description': 'The MH6 is a compact and powerful 6-axis robot with high performance in a variety of applications such as machine tending, material handling and processing, where versatility is required.',
        'imageurl': 'http://www.roboticautomation.com.au/system/images/W1siZiIsIjIwMTUvMDMvMTIvODV3dzFlMGN5ZF9taDYuanBnIl0sWyJwIiwidGh1bWIiLCIzMDB4MTgwXHUwMDNlIl1d/mh6.jpg?sha=f1a26704206ed4b5',
        'mpaa': 'pg-13',
        'releaseDate': '2003-12-17T00:00:00',
        'title': 'Motoman MH6 D/F/C',
        'price': 15.95,
        'starRating': 4.5,
        'approvalRating': 0.9895,
        'category': 'action',
        'tags': ['walking', 'fast']
      }
    ];
    return { Robots };
  }
}
