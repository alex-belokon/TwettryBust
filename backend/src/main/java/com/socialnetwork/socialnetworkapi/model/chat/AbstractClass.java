//package com.socialnetwork.socialnetworkapi.model.chat;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.GenericGenerator;
//
//import java.time.LocalDateTime;
//import java.util.UUID;
//@Getter
//@Setter
//@NoArgsConstructor
//@MappedSuperclass
//public class AbstractClass {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "UUID", updatable = false, nullable = false)
//    private UUID id;
//
//    @Version
//    private Long version = 0L;
//
//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(name = "created_date", updatable = false)
//    @CreationTimestamp
//    private LocalDateTime createdAt;
//
//}
