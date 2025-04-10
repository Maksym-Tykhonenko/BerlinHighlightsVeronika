const locations = [
    {
        image: require('../assets/locations/BerlinSpielbank/main.png'),
        name: 'Berlin Spielbank',
        address: 'Marlene-Dietrich-Platz 1, 10785 Berlin',
        spoiler: 'One of Berlin’s most famous casinos, located in the city center. It offers an elegant atmosphere and vibrant nightlife.',
        description: 'Spielbank Berlin is one of the city’s largest casinos, originally opened in 1975. In 1998, it relocated to Potsdamer Platz, becoming a key nightlife attraction in central Berlin. The casino blends classic elegance with a modern style, offering visitors a variety of entertainment options.',
        opened: 'Daily',
        metro: 'Potsdamer Platz',
        nearby: [
            {
                image: require('../assets/locations/BerlinSpielbank/1.png'),
                name: 'Tiergarten',
                address: '10785 Berlin, Germany',
                description: 'Tiergarten is Berlin’s largest and most famous park, an ideal place for relaxation and walks. Once a hunting ground for Prussian kings, today it serves as an oasis of peace and greenery in the heart of the city. You can spend an entire day wandering through dense forests, enjoying the views of ponds and lakes, and relaxing in shaded alleys. The park’s “Island of the World” is particularly atmospheric, where, surrounded by ancient trees and secluded corners, you feel like you’re in another time. It’s a perfect place for leisurely strolls or more active outdoor activities like cycling or picnicking.'
            },
            {
                image: require('../assets/locations/BerlinSpielbank/2.png'),
                name: 'Potsdamer Arkaden',
                address: 'Potsdamer Platz 1, 10785 Berlin',
                description: 'Potsdamer Platz Arkaden is an indoor oasis in the heart of Berlin, where you can enjoy green spaces amidst the modern urban landscape. This unique garden inside a shopping mall allows you to relax in nature while being surrounded by the hustle and bustle of the city. The indoor green areas with live plants, cozy benches, and terraces provide a cozy atmosphere in the midst of the capital’s vibrant district. Panoramic views of the skyscrapers, Potsdamer Platz, and architectural landmarks add a special touch to this place. It’s perfect for a quick break after shopping or business meetings.'
            },
            {
                image: require('../assets/locations/BerlinSpielbank/3.png'),
                name: 'Landwehr Canal',
                address: 'Landwehr Canal, 10963 Berlin',
                description: 'Landwehr Canal is a picturesque waterfront stretching through several districts of Berlin, including Charlottenburg and Kreuzberg. The canal runs through historic buildings and modern cafés, making it a great spot for peaceful walks or bike rides along the water. Here, you can enjoy beautiful urban views and a calm atmosphere as you stroll along the scenic canal, which is also a favorite spot for locals who enjoy a peaceful walk. There are cozy cafés along the waterfront where you can rest and take in the views.'
            }
        ]
    },
    {
        image: require('../assets/locations/VulkanSternCasino/main.png'),
        name: 'Vulkan Stern Casino',
        address: 'Nollendorfplatz 5, 10777 Berlin',
        spoiler: 'A casino in the Schöneberg district, near Nollendorfplatz. Its cozy setting and convenient location make it a popular entertainment spot.',
        description: 'Located in the lively Schöneberg district, this casino offers a cozy atmosphere and a convenient location near the metro station. Vulkan Stern Casino is popular among both locals and tourists looking for a relaxed entertainment experience in the heart of the city.',
        opened: 'Daily',
        metro: 'Nollendorfplatz',
        nearby: [
            {
                image: require('../assets/locations/VulkanSternCasino/1.png'),
                name: 'Viktoria-Luise-Platz',
                address: 'Viktoria-Luise-Platz, 10781 Berlin',
                description: 'Viktoria-Luise-Platz is a peaceful square surrounded by trees and featuring beautiful fountains, a perfect spot for relaxation in the midst of the lively Schöneberg district. Here, you can unwind while watching children play and people pass by, all while enjoying the quiet ambiance of this charming green space. It’s a wonderful place to rest or take a short break from the hustle and bustle of the city.'
            },
            {
                image: require('../assets/locations/VulkanSternCasino/2.png'),
                name: 'Park am Gleisdreieck',
                address: 'Gleisdreieck Park, 10963 Berlin',
                description: 'Park am Gleisdreieck is a stunning park built on the site of former railway tracks, offering a unique blend of modern green lawns and a rich historical atmosphere. With ample space for picnics, walking, or cycling, it’s a versatile park where both locals and tourists come to enjoy the outdoors. The park offers a sense of tranquility while being surrounded by the pulse of the city, providing a great escape for relaxation and recreation.'
            },
            {
                image: require('../assets/locations/VulkanSternCasino/3.png'),
                name: 'Lützowplatz',
                address: 'Lützowplatz, 10785 Berlin',
                description: 'Lützowplatz is a small, cozy urban park in the heart of Berlin, surrounded by trees and benches. Despite its size, it’s incredibly inviting and serves as an ideal location for quiet evenings or short walks during lunch breaks. The park’s intimate atmosphere offers a perfect place for people to take a peaceful pause, relax, or simply enjoy a moment of calm in the middle of the city’s busy environment.'
            }
        ]
    },
    {
        image: require('../assets/locations/MerkurSpielothek/main.png'),
        name: 'Merkur Spielothek',
        address: 'Oranienburger Str. 110, 10117 Berlin',
        spoiler: 'An entertainment center on Oranienburger Straße, featuring a modern interior and a welcoming atmosphere.',
        description: 'This entertainment center on Oranienburger Straße offers guests modern gaming technology, stylish design, and a welcoming atmosphere. The casino is conveniently situated in an area filled with bars, restaurants, and other nightlife spots.',
        opened: 'Daily',
        metro: 'Oranienburger Tor',
        nearby: [
            {
                image: require('../assets/locations/MerkurSpielothek/1.png'),
                name: 'Monbijou Park',
                address: 'Monbijoupark, 10178 Berlin',
                description: 'Monbijou Park is a charming green space located along the Spree River, offering stunning views of the river and the iconic Berlin Cathedral. The park is perfect for a relaxing picnic, a stroll, or spending time with friends. With its serene atmosphere and beautiful surroundings, it’s a favorite spot for both locals and visitors who want to escape the city’s hustle and enjoy nature.'
            },
            {
                image: require('../assets/locations/MerkurSpielothek/2.png'),
                name: 'James-Simon-Park',
                address: 'James-Simon-Park, 10178 Berlin',
                description: 'James-Simon-Park is a small yet highly popular park offering a peaceful retreat for outdoor relaxation. Ideal for casual meetups with friends or for reading a book under the shade of trees, this park provides a calming escape in the heart of the city. Its intimate environment and beautiful greenery make it a perfect spot for unwinding in nature.'
            },
            {
                image: require('../assets/locations/MerkurSpielothek/3.png'),
                name: 'Hackescher Courtyards',
                address: 'Hackescher Markt, 10178 Berlin',
                description: 'Hackescher Markt Courtyards are hidden gems in the bustling Hackescher Markt area, featuring green oases tucked away from the city’s busy streets. These courtyards are home to atmospheric cafés and quiet corners where visitors can enjoy peaceful moments while being surrounded by nature. The courtyards also offer breathtaking views of the city, making them an ideal place to relax and enjoy the unique urban scenery.'
            }
        ]
    }
];

export default locations;