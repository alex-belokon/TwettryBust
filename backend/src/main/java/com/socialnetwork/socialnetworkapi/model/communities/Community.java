package com.socialnetwork.socialnetworkapi.model.communities;

import com.socialnetwork.socialnetworkapi.model.AbstractEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "communities")
public class Community extends AbstractEntity {
    @Column(name = "name")
    private String name;
    @Column(name = "banner")
    private String banner;
    @Column(name = "description")
    private String description;
    @Column(name = "about")
    private String about;
}
