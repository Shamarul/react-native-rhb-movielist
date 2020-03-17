import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Linking }  from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';

class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }


    setModalVisible = () => {
        this.setState({modal : !this.state.modal})
    }

    render() {

        Rating = (props) => {

            if(props.rating) {
                return(
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={props.rating}
                        fullStarColor='#edc02b'
                        emptyStarColor='#edc02b'
                        starSize={20}
                    />
                );
            } else {
                return(
                    <View />
                );
            }
        }

        listing = this.props.list.map((lt, id)=>{
            return (
                <TouchableOpacity key={id} onPress={()=>{this.setModalVisible()}}>
                    <View style={styles.movieBox}>
                        <Image style={styles.image} source={lt.image}/>
                        <Text style={styles.category}>
                            {lt.category}
                        </Text>
                        <View style={{width: 100}}>
                            <Rating rating={lt.rating}/>
                        </View>
                        <Text style={styles.title}>
                            {lt.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })

        return (
            <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modal}
                onRequestClose={() => {

                }}>
                <View style={styles.modalOut}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(!this.state.modalVisible)} style={styles.overlay} />
                    <View style={styles.modalIn}>
                        {/* Modal Header */}
                        <TouchableOpacity onPress={()=>{Linking.openURL('https://zons.io')}}><Text style={styles.link}>zons.io</Text></TouchableOpacity>
                    </View>
                </View>
                </Modal>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.listContainer}>
                        {listing}
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flexDirection: 'row',
        padding: 5,
        width: '100%',
    },
    movieBox: {
        margin: 5,
        borderRadius: 4,
    },
    image: {
        alignSelf:'center',
        margin:1, 
        width: 150, 
        height: 150, 
        borderRadius: 10
    },
    category: {
        fontSize: 8, 
        paddingTop: 5
    },
    rating: {
        paddingTop: 5
    },
    title: {
        width: 150, 
        paddingTop: 5
    },
    modalOut: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    overlay: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    modalIn: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: 'grey', 
        borderWidth :0.2 , 
        width:'97%', 
        padding: 20, 
        borderRadius: 7,
        minHeight: 10,
        alignItems: 'center'
    },
    link: {
        color: 'blue',
    }
});

MovieList.defaultProps = {
    list: [],
 };
 
 MovieList.propTypes = {
     list: PropTypes.array,
 };

export default MovieList;