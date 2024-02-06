package com.socialnetwork.socialnetworkapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "posts")
public class Post extends AbstractEntity{

}
