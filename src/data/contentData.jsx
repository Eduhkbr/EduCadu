import dogImg from '../assets/img/dog.png';
import catImg from '../assets/img/cat.png';
import lionImg from '../assets/img/lion.png';
import bearImg from '../assets/img/bear.png';
import birdImg from '../assets/img/bird.png';
import elephantImg from '../assets/img/elephant.png';
import foxImg from '../assets/img/fox.png';
import pigImg from '../assets/img/pig.png';
import turtleImg from '../assets/img/turtle.png';
import zebraImg from '../assets/img/zebra.png';
import ballImg from '../assets/img/ball.png';

// =================================================================
// RESPONSABILIDADE: Conter todos os dados de conteúdo do aplicativo.
// =================================================================
const contentData = {
    counting_item: {
        image: ballImg,
        alt: 'Bola'
    },
    abc: [
        { display: 'A', textKey: 'alphabet_animal', image: 'https://placehold.co/400x300/FFC107/FFFFFF?text=A' },
        { display: 'B', textKey: 'alphabet_ball', image: 'https://placehold.co/400x300/3F51B5/FFFFFF?text=B' },
        { display: 'C', textKey: 'alphabet_car', image: 'https://placehold.co/400x300/4CAF50/FFFFFF?text=C' },
        { display: 'D', textKey: 'alphabet_date', image: 'https://placehold.co/400x300/E91E63/FFFFFF?text=D' },
        { display: 'E', textKey: 'alphabet_elephant', image: 'https://placehold.co/400x300/607D8B/FFFFFF?text=E' },
        { display: 'F', textKey: 'alphabet_flower', image: 'https://placehold.co/400x300/00BCD4/FFFFFF?text=F' },
        { display: 'G', textKey: 'alphabet_goal', image: 'https://placehold.co/400x300/795548/FFFFFF?text=G' },
        { display: 'H', textKey: 'alphabet_hotel', image: 'https://placehold.co/400x300/CDDC39/FFFFFF?text=H' },
        { display: 'I', textKey: 'alphabet_image', image: 'https://placehold.co/400x300/FF5722/FFFFFF?text=I' },
        { display: 'J', textKey: 'alphabet_jeans', image: 'https://placehold.co/400x300/673AB7/FFFFFF?text=J' },
        { display: 'K', textKey: 'alphabet_kiwi', image: 'https://placehold.co/400x300/9E9E9E/FFFFFF?text=K' },
        { display: 'L', textKey: 'alphabet_lemon', image: 'https://placehold.co/400x300/FFC107/FFFFFF?text=L' },
        { display: 'M', textKey: 'alphabet_map', image: 'https://placehold.co/400x300/3F51B5/FFFFFF?text=M' },
        { display: 'N', textKey: 'alphabet_number', image: 'https://placehold.co/400x300/4CAF50/FFFFFF?text=N' },
        { display: 'O', textKey: 'alphabet_olive', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=O' },
        { display: 'P', textKey: 'alphabet_park', image: 'https://placehold.co/400x300/F44336/FFFFFF?text=P' },
        { display: 'Q', textKey: 'alphabet_quartz', image: 'https://placehold.co/400x300/2196F3/FFFFFF?text=Q' },
        { display: 'R', textKey: 'alphabet_radio', image: 'https://placehold.co/400x300/FFEB3B/FFFFFF?text=R' },
        { display: 'S', textKey: 'alphabet_salad', image: 'https://placehold.co/400x300/E91E63/FFFFFF?text=S' },
        { display: 'T', textKey: 'alphabet_taxi', image: 'https://placehold.co/400x300/607D8B/FFFFFF?text=T' },
        { display: 'U', textKey: 'alphabet_uniform', image: 'https://placehold.co/400x300/00BCD4/FFFFFF?text=U' },
        { display: 'V', textKey: 'alphabet_video', image: 'https://placehold.co/400x300/795548/FFFFFF?text=V' },
        { display: 'W', textKey: 'alphabet_walter', image: 'https://placehold.co/400x300/CDDC39/FFFFFF?text=W' },
        { display: 'X', textKey: 'alphabet_xylophone', image: 'https://placehold.co/400x300/FF5722/FFFFFF?text=X' },
        { display: 'Y', textKey: 'alphabet_yoga', image: 'https://placehold.co/400x300/673AB7/FFFFFF?text=Y' },
        { display: 'Z', textKey: 'alphabet_zebra', image: 'https://placehold.co/400x300/9E9E9E/FFFFFF?text=Z' },
    ],
    '123': [
        { display: '1', textKey: 'number_one', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=1' },
        { display: '2', textKey: 'number_two', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=2' },
        { display: '3', textKey: 'number_three', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=3' },
        { display: '4', textKey: 'number_four', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=4' },
        { display: '5', textKey: 'number_five', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=5' },
        { display: '6', textKey: 'number_six', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=6' },
        { display: '7', textKey: 'number_seven', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=7' },
        { display: '8', textKey: 'number_eight', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=8' },
        { display: '9', textKey: 'number_nine', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=9' },
        { display: '10', textKey: 'number_ten', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=10' },
        { display: '11', textKey: 'number_eleven', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=11' },
        { display: '12', textKey: 'number_twelve', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=12' },
        { display: '13', textKey: 'number_thirteen', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=13' },
        { display: '14', textKey: 'number_fourteen', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=14' },
        { display: '15', textKey: 'number_fifteen', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=15' },
        { display: '16', textKey: 'number_sixteen', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=16' },
        { display: '17', textKey: 'number_seventeen', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=17' },
        { display: '18', textKey: 'number_eighteen', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=18' },
        { display: '19', textKey: 'number_nineteen', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=19' },
        { display: '20', textKey: 'number_twenty', image: 'https://placehold.co/400x300/9C27B0/FFFFFF?text=20' },
    ],
    colors: [
        { display: '#F44336', textKey: 'color_red', image: '' },
        { display: '#2196F3', textKey: 'color_blue', image: '' },
        { display: '#FFEB3B', textKey: 'color_yellow', image: '' },
        { display: '#4CAF50', textKey: 'color_green', image: '' },
        { display: '#FF9800', textKey: 'color_orange', image: '' },
        { display: '#9C27B0', textKey: 'color_purple', image: '' },
        { display: '#607D8B', textKey: 'color_grey', image: '' },
        { display: '#795548', textKey: 'color_brown', image: '' },
        { display: 'rgba(255,87,147,0.85)', textKey: 'color_pink', image: '' },
    ],
    shapes: [
        { display: '●', textKey: 'shape_circle', image: '' },
        { display: '■', textKey: 'shape_square', image: '' },
        { display: '▲', textKey: 'shape_triangle', image: '' },
        { display: '★', textKey: 'shape_star', image: '' },
        { display: '❤', textKey: 'shape_heart', image: '' },
        { display: '✚', textKey: 'shape_cross', image: '' },
        { display: '⬟', textKey: 'shape_pentagon', image: '' },
        { display: '⬣', textKey: 'shape_hexagon', image: '' },
    ],
    animals: [
        { displayKey: 'animal_dog_icon', textKey: 'animal_dog', image: dogImg },
        { displayKey: 'animal_cat_icon', textKey: 'animal_cat', image: catImg },
        { displayKey: 'animal_lion_icon', textKey: 'animal_lion', image: lionImg },
        { displayKey: 'animal_bear_icon', textKey: 'animal_bear', image: bearImg },
        { displayKey: 'animal_bird_icon', textKey: 'animal_bird', image: birdImg },
        { displayKey: 'animal_elephant_icon', textKey: 'animal_elephant', image: elephantImg },
        { displayKey: 'animal_fox_icon', textKey: 'animal_fox', image: foxImg },
        { displayKey: 'animal_pig_icon', textKey: 'animal_pig', image: pigImg },
        { displayKey: 'animal_turtle_icon', textKey: 'animal_turtle', image: turtleImg },
        { displayKey: 'animal_zebra_icon', textKey: 'animal_zebra', image: zebraImg },
    ]
};

export default contentData;