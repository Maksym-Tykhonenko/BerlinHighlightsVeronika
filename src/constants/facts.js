const facts = [
    {
        image: require('../assets/facts/HistoricalBerlin/main.png'),
        name: 'Historical Berlin',
        description: 'A route through iconic landmarks: from the Brandenburg Gate to the Berlin Wall, with historical facts and archival photos.',
        categories: [
            {
                category: 'Symbols of the Past',
                description: 'Explore key landmarks that became symbols of history.',
                locations: [
                    {
                        name: 'Brandenburg Gate',
                        about: 'Symbol of Unity',
                        image: require('../assets/facts/HistoricalBerlin/1/1.png'),
                        address: 'Pariser Platz, 10117 Berlin',
                        description: 'The Brandenburg Gate is not only Berlin’s most iconic landmark, but also a symbol of the city’s turbulent history and its reunification. Built in the 18th century, this neoclassical triumphal arch once marked the division of the city during the Cold War, standing near the Berlin Wall. Today, it stands as a powerful emblem of peace and unity. It’s especially beautiful at night when illuminated, making it a must-visit site for anyone in Berlin.'
                    },
                    {
                        name: 'Reichstag Building',
                        about: 'Seat of Democracy',
                        image: require('../assets/facts/HistoricalBerlin/1/2.png'),
                        address: 'Platz der Republik 1, 11011 Berlin',
                        description: 'A place of immense historical importance, the Reichstag is home to Germany’s parliament. Built in 1894, it has undergone significant transformations, including the addition of a glass dome designed by architect Norman Foster after the fall of the Berlin Wall. The dome provides stunning 360-degree views of the city and houses exhibits about the building’s history. The Reichstag stands as a symbol of Germany’s modern democracy.'
                    },
                    {
                        name: 'Checkpoint Charlie',
                        about: 'Cold War Landmark',
                        image: require('../assets/facts/HistoricalBerlin/1/3.png'),
                        address: 'Friedrichstr. 43-45, 10117 Berlin',
                        description: 'Once the most famous crossing point between East and West Berlin during the Cold War, Checkpoint Charlie was the site of intense tensions and dramatic moments of escape and confrontation. Today, the area is a lively historical site where visitors can explore the original guardhouse and the museum, which offers a gripping account of the Berlin Wall, espionage, and the lives affected by the division of the city. It’s a poignant reminder of Berlin’s divided past.'
                    }
                ]
            },
            {
                category: 'Forgotten Stories',
                description: 'Places that hide lesser-known but significant historical events.',
                locations: [
                    {
                        name: 'Berlin Wall Memorial',
                        about: 'Memorial to History',
                        image: require('../assets/facts/HistoricalBerlin/2/1.png'),
                        address: 'Bernauer Str. 111, 13355 Berlin',
                        description: 'The Berlin Wall Memorial is one of the most poignant and significant sites in Berlin. It commemorates the division of the city during the Cold War and the dramatic stories of families separated by the Wall. The memorial includes a preserved stretch of the Wall, an observation tower, and an exhibition that highlights the stories of escape, surveillance, and the struggle for freedom. This powerful site offers visitors an intimate understanding of the Berlin Wall’s impact on the city and its people.'
                    },
                    {
                        name: 'Rosenstrasse Palace',
                        about: 'Hidden History',
                        image: require('../assets/facts/HistoricalBerlin/2/2.png'),
                        address: 'Rosenstr. 1-4, 10178 Berlin',
                        description: 'Nestled in the heart of Berlin, the Rosenstrasse Palace stands as a testament to the courage of ordinary citizens during the Nazi era. This former palace is most famous for the Rosenstrasse protest, when women protested the deportation of their Jewish husbands in 1943. Today, the site houses a museum that educates visitors about the significance of this peaceful resistance. It’s an inspiring example of bravery in the face of injustice.'
                    },
                    {
                        name: 'Günter Lift Memorial',
                        about: 'Tribute to the Unknown',
                        image: require('../assets/facts/HistoricalBerlin/2/3.png'),
                        address: 'Genthiner Str. 9, 10785 Berlin',
                        description: 'This quiet, lesser-known memorial is dedicated to Günter Lift, a German civil servant who resisted the Nazi regime. The memorial marks the site of his courageous acts and his ultimate sacrifice for standing against the tyranny of his time. Today, it serves as a reflective space where visitors can pay tribute to those who fought for freedom during one of history’s darkest periods.'
                    }
                ]
            }
        ]
    },
    {
        image: require('../assets/facts/ModernArchitecture/main.png'),
        name: 'Modern Architecture',
        description: 'A walk through futuristic buildings and iconic structures.',
        categories: [
            {
                category: 'Skyscrapers and Design',
                description: 'Stunning modern buildings that shape the city’s new look.',
                locations: [
                    {
                        name: 'Potsdamer Platz',
                        about: 'Modern Heart of Berlin',
                        image: require('../assets/facts/ModernArchitecture/1/1.png'),
                        address: 'Potsdamer Platz, 10785 Berlin',
                        description: 'Potsdamer Platz is the heart of modern Berlin, where history meets ultra-modern architecture. Once a bustling square, it was left in ruins after World War II and the city’s division. Today, it’s a dynamic area filled with futuristic buildings, such as the famous office towers and the iconic Sony Center. Here, you can witness a blend of old and new structures, enjoy numerous cafes, theaters, and shops, and soak in the vibrant atmosphere of one of Berlin’s most iconic spots.'
                    },
                    {
                        name: 'Berlin Central Station',
                        about: 'Architectural Marvel',
                        image: require('../assets/facts/ModernArchitecture/1/2.png'),
                        address: 'Europaplatz 1, 10557 Berlin',
                        description: 'Berlin Central Station is not just a transport hub, but an architectural marvel. Opened in 2006, it became the largest railway station in Germany and one of the most modern in Europe. With its glass facades and multi-level design connecting train platforms, shops, and restaurants, it feels like stepping into the future. It’s not only a place for travelers but also a must-see for architecture enthusiasts and anyone interested in cutting-edge city design.'
                    },
                    {
                        name: 'Humboldt Forum',
                        about: 'Cultural Gateway',
                        image: require('../assets/facts/ModernArchitecture/1/3.png'),
                        address: 'Schlossplatz, 10178 Berlin',
                        description: 'The Humboldt Forum is a cultural center located in the reconstructed Berlin Palace. It combines historic architecture with modern cultural and scientific exhibitions. The museum houses collections of art and artifacts that reflect Germany’s and the world’s cultural heritage. Visitors can explore global exchanges, research, and see unique archaeological finds and works of art. It’s the perfect place for those interested in culture, history, and the arts.'
                    }
                ]
            },
            {
                category: 'Art and Urbanism',
                description: 'Experimental architectural solutions and art spaces.',
                locations: [
                    {
                        name: 'Hackescher Markt',
                        about: 'Urban Vibe',
                        image: require('../assets/facts/ModernArchitecture/2/1.png'),
                        address: 'Hackescher Markt, 10178 Berlin',
                        description: 'The Hackescher Markt Quarter is a vibrant cultural hotspot, brimming with charm and history. Once a quiet market square, today it’s one of Berlin’s trendiest areas. Cobblestone streets are lined with boutique shops, cozy cafes, and art galleries, creating a perfect blend of tradition and modernity. Hidden courtyards and alternative spaces offer a unique atmosphere for those who appreciate art, architecture, and Berlin’s dynamic urban life.'
                    },
                    {
                        name: 'Berlin Gallery',
                        about: 'Artistic Legacy',
                        image: require('../assets/facts/ModernArchitecture/2/2.png'),
                        address: 'Alte Jakobstr. 124, 10969 Berlin',
                        description: 'The Berlin Gallery is an exciting venue for contemporary art located in the heart of the city. Featuring works by both German and international artists, the gallery presents dynamic exhibitions that challenge, inspire, and engage visitors. From modern sculpture to thought-provoking installations, it’s an essential stop for anyone interested in Berlin’s artistic innovation and ever-changing creative scene.'
                    },
                    {
                        name: 'Rainbow Quarter',
                        about: 'Colorful Streets',
                        image: require('../assets/facts/ModernArchitecture/2/3.png'),
                        address: 'Oranienstr. 10999 Berlin',
                        description: 'The Rainbow Quarter is Berlin’s celebration of diversity and creativity. Known for its vibrant street art, colorful murals, and alternative spirit, it’s a neighborhood that welcomes everyone. Lively cafes, quirky shops, and unique cultural spaces make it an exciting place to explore. Whether you’re drawn to the rainbow of colors or the inclusive atmosphere, the Rainbow Quarter is an expression of Berlin’s open-mindedness and artistic flair.'
                    }
                ]
            }
        ]
    },
    {
        image: require('../assets/facts/BerlinforRelaxation/main.png'),
        name: 'Berlin for Relaxation',
        description: 'A route through the city’s coziest spots: from peaceful parks to scenic waterfronts, with tips for picnics and strolls.',
        categories: [
            {
                category: 'Parks and Green Spaces',
                description: 'Perfect spots for relaxation, picnics, and outdoor walks.',
                locations: [
                    {
                        name: 'Tiergarten',
                        about: 'Green Escape',
                        image: require('../assets/facts/BerlinforRelaxation/1/1.png'),
                        address: 'Tiergarten, 10785 Berlin',
                        description: 'Tiergarten is Berlin’s central park, offering a lush escape from the city’s hustle and bustle. Once a hunting ground for Prussian kings, it’s now a beautiful green space perfect for walks, picnics, and leisurely strolls. The park is home to tranquil lakes, winding paths, and monuments like the Victory Column, making it a must-visit for nature lovers and history buffs alike.'
                    },
                    {
                        name: 'Monbijou Park',
                        about: 'Riverside Serenity',
                        image: require('../assets/facts/BerlinforRelaxation/1/2.png'),
                        address: 'Monbijoupark, 10178 Berlin',
                        description: 'Located along the Spree River, Monbijou Park is a charming, tranquil oasis in the heart of Berlin. Its lush lawns and shady trees make it an ideal spot for relaxation and picnics. The park offers a scenic view of Museum Island, and it’s perfect for those seeking a quiet retreat amidst the vibrant city life. It’s also a great place to enjoy the warm Berlin sunshine.'
                    },
                    {
                        name: 'Tempelhof Field',
                        about: 'Historic Open Space',
                        image: require('../assets/facts/BerlinforRelaxation/1/3.png'),
                        address: 'Tempelhofer Damm, 12101 Berlin',
                        description: 'Tempelhof Field is one of Berlin’s most unique parks, occupying the grounds of the former Tempelhof Airport. The massive open space is perfect for outdoor activities like cycling, skating, and kite flying. With its expansive lawns and fascinating history, it’s a popular spot for both locals and visitors. The park’s blend of history and wide-open spaces makes it a truly distinctive location in Berlin.'
                    }
                ]
            },
            {
                category: 'Rivers and Waterfronts',
                description: 'Waterfront strolls with stunning views and cozy spots.',
                locations: [
                    {
                        name: 'Landwehr Canal',
                        about: 'Scenic Waterway',
                        image: require('../assets/facts/BerlinforRelaxation/2/1.png'),
                        address: 'Landwehr Canal, 10963 Berlin',
                        description: 'The Landwehr Canal is a picturesque waterway running through central Berlin, offering a peaceful escape from the city. Perfect for relaxing boat rides, cycling, or walking along its scenic banks, the canal features charming bridges and peaceful spots for picnics. It’s a great place to unwind and experience Berlin’s natural beauty.'
                    },
                    {
                        name: 'Museum Waterfront',
                        about: 'Cultural Waterfront',
                        image: require('../assets/facts/BerlinforRelaxation/2/2.png'),
                        address: 'Spree River, 10178 Berlin',
                        description: 'The Spree River waterfront near Museum Island offers breathtaking views of Berlin’s cultural heart. Ideal for a leisurely stroll or boat tour, this area provides a perfect blend of natural beauty and cultural significance. With historic landmarks like the Berlin Cathedral and the Museumsinsel nearby, it’s a must-visit location for both relaxation and exploration.'
                    },
                    {
                        name: 'Lietzensee',
                        about: 'Hidden Gem',
                        image: require('../assets/facts/BerlinforRelaxation/2/3.png'),
                        address: 'Lietzenseepark, 14057 Berlin',
                        description: 'Lietzensee is a serene lake surrounded by a beautiful park, providing a peaceful retreat from the urban hustle. It’s an ideal spot for picnics, leisurely walks, and nature lovers. The calm waters and lush surroundings make it a perfect place to relax and enjoy Berlin’s more tranquil side.'
                    }
                ]
            }
        ]
    }
];

export default facts;