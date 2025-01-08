import { makeId } from '../services/util.service'

export function StayListHomePage() {
    const stays = [
        {
          _id: makeId,
          name: 'Ribeira Charming Duplex',
          type: 'House',
          imgUrls: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
          price: 80,
          summary: 'Fantastic duplex apartment in the heart of the city.',
          capacity: 8,
          amenities: [
            'TV',
            'Wifi',
            'Kitchen',
            'Smoking allowed',
            'Pets allowed',
            'Cooking basics',
          ],
          labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
          host: {
            _id: 'u101',
            fullname: 'Davit Pok',
            imgUrl: 'https://example.com/profile1.jpg',
          },
          loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Lisbon',
            address: '17 Kombo st',
            lat: -8.61308,
            lng: 41.1413,
          },
          reviews: [
            {
              id: 'review_001',
              txt: 'Very helpful hosts. Cooked traditional meals!',
              rate: 4,
              by: {
                _id: 'u102',
                fullname: 'John Doe',
                imgUrl: '/img/user2.jpg',
              },
            },
          ],
          likedByUsers: ['user_01'],
        },
        {
          _id: makeId,
          name: 'Oceanview Penthouse',
          type: 'Apartment',
          imgUrls: ['https://example.com/ocean1.jpg', 'https://example.com/ocean2.jpg'],
          price: 200,
          summary: 'Luxury penthouse with stunning ocean views.',
          capacity: 4,
          amenities: ['TV', 'Wifi', 'Air conditioning', 'Hot tub'],
          labels: ['Luxury', 'Relax', 'Beach'],
          host: {
            _id: 'u103',
            fullname: 'Sophia Lee',
            imgUrl: 'https://example.com/profile2.jpg',
          },
          loc: {
            country: 'USA',
            countryCode: 'US',
            city: 'Miami',
            address: '450 Ocean Drive',
            lat: 25.7617,
            lng: -80.1918,
          },
          reviews: [
            {
              id: 'review_002',
              txt: 'Amazing location and incredible views!',
              rate: 5,
              by: {
                _id: 'u104',
                fullname: 'Emma Brown',
                imgUrl: '/img/user3.jpg',
              },
            },
          ],
          likedByUsers: ['user_02', 'user_03'],
        },
        {
          _id: makeId,
          name: 'Rustic Cabin Retreat',
          type: 'Cabin',
          imgUrls: ['https://example.com/cabin1.jpg', 'https://example.com/cabin2.jpg'],
          price: 120,
          summary: 'Cozy cabin surrounded by nature.',
          capacity: 6,
          amenities: ['Fireplace', 'Kitchen', 'Wifi', 'Hiking trails'],
          labels: ['Nature', 'Cozy', 'Adventure'],
          host: {
            _id: 'u105',
            fullname: 'James Wilson',
            imgUrl: 'https://example.com/profile3.jpg',
          },
          loc: {
            country: 'Canada',
            countryCode: 'CA',
            city: 'Banff',
            address: '85 Mountain Rd',
            lat: 51.1784,
            lng: -115.5708,
          },
          reviews: [
            {
              id: 'review_003',
              txt: 'Perfect getaway for nature lovers.',
              rate: 5,
              by: {
                _id: 'u106',
                fullname: 'Oliver Smith',
                imgUrl: '/img/user4.jpg',
              },
            },
          ],
          likedByUsers: ['user_04'],
        },
        {
          _id: makeId,
          name: 'Modern Urban Loft',
          type: 'Loft',
          imgUrls: ['https://example.com/loft1.jpg', 'https://example.com/loft2.jpg'],
          price: 150,
          summary: 'Stylish loft in the heart of downtown.',
          capacity: 3,
          amenities: ['Wifi', 'Elevator', 'Washer', 'Work desk'],
          labels: ['City', 'Modern', 'Stylish'],
          host: {
            _id: 'u107',
            fullname: 'Anna Taylor',
            imgUrl: 'https://example.com/profile4.jpg',
          },
          loc: {
            country: 'UK',
            countryCode: 'GB',
            city: 'London',
            address: '221B Baker Street',
            lat: 51.5074,
            lng: -0.1278,
          },
          reviews: [
            {
              id: 'review_004',
              txt: 'Close to everything, great for business trips.',
              rate: 4.5,
              by: {
                _id: 'u108',
                fullname: 'Lucas Moore',
                imgUrl: '/img/user5.jpg',
              },
            },
          ],
          likedByUsers: ['user_05', 'user_06'],
        },
        {
          _id:makeId,
          name: 'Countryside Family Home',
          type: 'House',
          imgUrls: ['https://example.com/house1.jpg', 'https://example.com/house2.jpg'],
          price: 100,
          summary: 'Spacious family home surrounded by greenery.',
          capacity: 10,
          amenities: ['TV', 'Wifi', 'Garden', 'Parking'],
          labels: ['Family', 'Spacious', 'Nature'],
          host: {
            _id: 'u109',
            fullname: 'Ethan Harris',
            imgUrl: 'https://example.com/profile5.jpg',
          },
          loc: {
            country: 'Australia',
            countryCode: 'AU',
            city: 'Sydney',
            address: '34 Rose Street',
            lat: -33.8688,
            lng: 151.2093,
          },
          reviews: [
            {
              id: 'review_005',
              txt: 'Great for large groups or family reunions.',
              rate: 4.8,
              by: {
                _id: 'u110',
                fullname: 'Mia White',
                imgUrl: '/img/user6.jpg',
              },
            },
          ],
          likedByUsers: ['user_07'],
        },
        {
          _id: makeId,
          name: 'Lakefront Cabin',
          type: 'Cabin',
          imgUrls: ['https://example.com/lake1.jpg', 'https://example.com/lake2.jpg'],
          price: 180,
          summary: 'Private cabin with stunning lake views.',
          capacity: 5,
          amenities: ['Canoe', 'Fireplace', 'Wifi', 'Fishing gear'],
          labels: ['Lake', 'Private', 'Relaxing'],
          host: {
            _id: 'u111',
            fullname: 'Isabella Clark',
            imgUrl: 'https://example.com/profile6.jpg',
          },
          loc: {
            country: 'Sweden',
            countryCode: 'SE',
            city: 'Stockholm',
            address: '12 Lake View Road',
            lat: 59.3293,
            lng: 18.0686,
          },
          reviews: [
            {
              id: 'review_006',
              txt: 'Peaceful and serene getaway.',
              rate: 5,
              by: {
                _id: 'u112',
                fullname: 'Henry King',
                imgUrl: '/img/user7.jpg',
              },
            },
          ],
          likedByUsers: ['user_08'],
        },
        {
          _id: makeId,
          name: 'Tropical Beachfront Bungalow',
          type: 'Bungalow',
          imgUrls: ['https://example.com/beach1.jpg', 'https://example.com/beach2.jpg'],
          price: 250,
          summary: 'Experience paradise in this beachfront bungalow.',
          capacity: 2,
          amenities: ['Private beach', 'Hammock', 'Outdoor shower'],
          labels: ['Beach', 'Paradise', 'Romantic'],
          host: {
            _id: 'u113',
            fullname: 'Grace Mitchell',
            imgUrl: 'https://example.com/profile7.jpg',
          },
          loc: {
            country: 'Thailand',
            countryCode: 'TH',
            city: 'Phuket',
            address: '15 Coconut Drive',
            lat: 7.8804,
            lng: 98.3923,
          },
          reviews: [
            {
              id: 'review_007',
              txt: 'Best beach stay ever!',
              rate: 5,
              by: {
                _id: 'u114',
                fullname: 'Ella Robinson',
                imgUrl: '/img/user8.jpg',
              },
            },
          ],
          likedByUsers: ['user_09'],
        },
        {
          _id: makeId,
          name: 'Alpine Ski Chalet',
          type: 'Chalet',
          imgUrls: ['https://example.com/chalet1.jpg', 'https://example.com/chalet2.jpg'],
          price: 300,
          summary: 'Luxurious chalet perfect for ski enthusiasts.',
          capacity: 12,
          amenities: ['Ski-in/ski-out', 'Hot tub', 'Fireplace'],
          labels: ['Ski', 'Luxury', 'Mountain'],
          host: {
            _id: 'u115',
            fullname: 'Leo Adams',
            imgUrl: 'https://example.com/profile8.jpg',
          },
          loc: {
            country: 'Switzerland',
            countryCode: 'CH',
            city: 'Zermatt',
            address: '99 Snowy Peak',
            lat: 46.0207,
            lng: 7.7491,
          },
          reviews: [
            {
              id: 'review_008',
              txt: 'Best skiing experience ever.',
              rate: 5,
              by: {
                _id: 'u116',
                fullname: 'Jack Thompson',
                imgUrl: '/img/user9.jpg',
              },
            },
          ],
          likedByUsers: ['user_10'],
        },  {
            _id: makeId,
            name: 'Historic Castle Stay',
            type: 'Castle',
            imgUrls: ['https://example.com/castle1.jpg', 'https://example.com/castle2.jpg'],
            price: 400,
            summary: 'Live like royalty in this historic castle.',
            capacity: 15,
            amenities: ['Private tour', 'Banquet hall', 'Fireplace'],
            labels: ['Luxury', 'History', 'Exclusive'],
            host: {
              _id: 'u117',
              fullname: 'Charlotte Cooper',
              imgUrl: 'https://example.com/profile9.jpg',
            },
            loc: {
              country: 'France',
              countryCode: 'FR',
              city: 'Loire Valley',
              address: '45 Castle Lane',
              lat: 47.2806,
              lng: 1.5061,
            },
            reviews: [
              {
                id: 'review_009',
                txt: 'A truly magical experience.',
                rate: 5,
                by: {
                  _id: 'u118',
                  fullname: 'Liam Garcia',
                  imgUrl: '/img/user10.jpg',
                },
              },
            ],
            likedByUsers: ['user_11'],
          },
          {
            _id: makeId,
            name: 'Desert Oasis',
            type: 'Villa',
            imgUrls: ['https://example.com/desert1.jpg', 'https://example.com/desert2.jpg'],
            price: 220,
            summary: 'Luxurious villa in a peaceful desert setting.',
            capacity: 6,
            amenities: ['Pool', 'Private garden', 'Wifi'],
            labels: ['Luxury', 'Relax', 'Unique'],
            host: {
              _id: 'u119',
              fullname: 'Ava Martin',
              imgUrl: 'https://example.com/profile10.jpg',
            },
            loc: {
              country: 'Morocco',
              countryCode: 'MA',
              city: 'Marrakech',
              address: '33 Desert Way',
              lat: 31.6295,
              lng: -7.9811,
            },
            reviews: [
              {
                id: 'review_010',
                txt: 'The perfect escape from the city.',
                rate: 4.7,
                by: {
                  _id: 'u120',
                  fullname: 'Amelia Wright',
                  imgUrl: '/img/user11.jpg',
                },
              },
            ],
            likedByUsers: ['user_12'],
          }]
      

  return (
    <section>
      <ul className='list'>
        {stays.map((stay) => (
          <article key={stay._id} className='stay-preview'>
            <div className='preview-img'>images</div>
            <div className='stay-card-details'>
              <div className='preview-header'>
                <div className='preview-name'>{stay.name}</div>
                <div className='preview-rating'>5 stars</div>
              </div>
              <div className='preview-summary'>
                <p>{stay.summary}</p>
              </div>
              <div className='preview-dates'>
                <p>July 17-19</p>
              </div>
              <div className='preview-price'>
                <span className='preview-price'>{stay.price}</span>
                <span>$ per night</span>
              </div>
            </div>
          </article>
        ))}
      </ul>
    </section>
  )
}
